import datetime

def actualiza_datos_creacion_modificacion(instancia,user,tipo="add"):
    
    hoy=datetime.datetime.now()
    fecha_hoy = datetime.date(hoy.year, hoy.month, hoy.day)
    
    if tipo=="add":
        instancia.creado=fecha_hoy
        instancia.creado_por=user
    
    instancia.modificado=fecha_hoy
    instancia.modificado_por=user

    return instancia