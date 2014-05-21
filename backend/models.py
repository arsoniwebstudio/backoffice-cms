# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
from backend.utils import actualiza_datos_creacion_modificacion
import datetime

class ClientApps(models.Model):
    
    name = models.CharField(max_length=50)
    img = models.CharField(max_length=50)
    app_host = models.CharField(max_length=50)
    app_root = models.CharField(max_length=50)

    files_host = models.CharField(max_length=50)
    files_root = models.CharField(max_length=50)
    
    img_host = models.CharField(max_length=50)
    img_root = models.CharField(max_length=50)
    
    db_host = models.CharField(max_length=50)
    db_port = models.CharField(max_length=50)
    db_engine = models.CharField(max_length=50)
    db_name = models.CharField(max_length=50)
    db_user = models.CharField(max_length=50)
    db_password = models.CharField(max_length=50)

    creado = models.DateField()
    modificado = models.DateField()
    creado_por = models.ForeignKey(User, related_name="Creado por")
    modificado_por = models.ForeignKey(User, related_name="Modificado por")

    class Meta:
        db_table = "sys_apps"
    
    def save(self, *args, **kwargs):
        hoy=datetime.datetime.now()
        fecha_hoy = datetime.date(hoy.year, hoy.month, hoy.day)
        self.creado=hoy
        self.modificado=hoy
        self.creado_por=1
        self.modificado_por=1
        super(Clientes, self).save(*args, **kwargs)

class Clientes(models.Model):
    nombre = models.CharField(max_length=50)
    cif = models.CharField(max_length=9, unique=True)
    telefono = models.CharField(max_length=15)
    email = models.EmailField(max_length=80, unique=True)
    direccion = models.CharField(max_length=100)
    codigo = models.CharField(max_length=50)
    #estado = models.IntegerField()
    creado = models.DateField()
    modificado = models.DateField()
    creado_por = models.ForeignKey(User, related_name="Creado por")
    modificado_por = models.ForeignKey(User, related_name="Modificado por")
    
    class Meta:
        db_table = "clientes"
    
    def save(self, *args, **kwargs):
        hoy=datetime.datetime.now()
        fecha_hoy = datetime.date(hoy.year, hoy.month, hoy.day)
        self.creado=fecha_hoy
        self.modificado=fecha_hoy
        self.creado_por=1
        self.modificado_por=1
        super(Clientes, self).save(*args, **kwargs)


