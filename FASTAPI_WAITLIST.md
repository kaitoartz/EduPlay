# Integración del Registro de Waitlist con FastAPI

Esta guía explica cómo conectar la landing page de Luminauts (`WaitlistLanding.jsx`) con un backend en FastAPI para guardar los correos de los usuarios registrados en una base de datos.

## 1. Estructura del Backend (FastAPI)

Crea un archivo llamado `main.py` en tu servidor FastAPI con la siguiente estructura básica.

### Instalación de dependencias
```bash
pip install fastapi uvicorn pydantic SQLAlchemy
```

### Código del Servidor (`main.py`)
```python
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_database, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import datetime

# Inicialización de FastAPI
app = FastAPI(title="Luminauts Waitlist API")

# Configuración de CORS para permitir peticiones desde el Frontend
# Asegúrate de cambiar esto a la URL de producción de tu frontend más adelante
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O ["http://localhost:5173"] para desarrollo local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de Base de Datos (SQLite para desarrollo local rápido)
DATABASE_URL = "sqlite:///./waitlist.db"
Base = declarative_base()

class SubscribedUser(Base):
    __tablename__ = "waitlist"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    registered_at = Column(DateTime, default=datetime.datetime.utcnow)

# Crear tablas
from sqlalchemy import create_engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# Pydantic Schemas
class EmailSchema(BaseModel):
    email: EmailStr

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para registrar un email
@app.post("/api/waitlist")
def register_email(payload: EmailSchema, db: Session = Depends(get_db)):
    email_lower = payload.email.strip().lower()
    
    # Verificar si el email ya existe
    existing_user = db.query(SubscribedUser).filter(SubscribedUser.email == email_lower).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Este correo ya está registrado en la lista de espera.")
    
    # Crear nuevo registro
    new_user = SubscribedUser(email=email_lower)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Retornar total de usuarios registrados para actualizar el contador real
    total_count = db.query(SubscribedUser).count()
    
    return {
        "success": True, 
        "message": "¡Suscripción exitosa!", 
        "total_registrados": total_count
    }

# Endpoint para obtener el total actual
@app.get("/api/waitlist/count")
def get_waitlist_count(db: Session = Depends(get_db)):
    total_count = db.query(SubscribedUser).count()
    return {"total": total_count}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
```

---

## 2. Modificaciones en el Frontend (`WaitlistLanding.jsx`)

Cuando tu backend FastAPI esté corriendo localmente en el puerto `8000` (o desplegado en la nube), realiza los siguientes cambios en `WaitlistLanding.jsx`.

### Cambiar función de envío de formulario `handleSubmit`
Reemplaza el código del submit de:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (!email) return;
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setStatus('success');
    localStorage.setItem('eduplay_subscribed_email', email);
  }, 1200);
};
```

Por el llamado real al backend de FastAPI:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) return;
  setLoading(true);
  setErrorMsg(''); // Agregar estado para manejar errores si se desea

  try {
    const response = await fetch('http://127.0.0.1:8000/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Ocurrió un error al registrar.');
    }

    setLoading(false);
    setStatus('success');
    localStorage.setItem('eduplay_subscribed_email', email);
    
    // Si el backend devuelve el total real, puedes actualizar el contador
    if (data.total_registrados) {
      setBaseCount(data.total_registrados);
    }
  } catch (error) {
    setLoading(false);
    console.error(error);
    alert(error.message || 'Error de conexión con el servidor.');
  }
};
```

### Inicializar el contador con el valor real del backend
Puedes hacer una llamada al iniciar la página para obtener el conteo de la base de datos:

```javascript
useEffect(() => {
  const fetchCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/waitlist/count');
      if (response.ok) {
        const data = await response.json();
        setBaseCount(data.total);
      }
    } catch (e) {
      console.warn("No se pudo obtener el conteo inicial del backend. Usando simulación.");
    }
  };
  fetchCount();
}, []);
```
