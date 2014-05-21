# -*- coding: utf-8 -*-
from backend.models import *
from tastypie.resources import ModelResource
from tastypie.authorization import DjangoAuthorization, Authorization
from django.shortcuts import render_to_response
from django.conf.urls import url
from tastypie.utils import trailing_slash
from django.contrib.auth import login, authenticate, logout
from django.core import serializers
import json
from django.contrib.auth.models import User
from django.forms.models import model_to_dict

def home(request):
    return render_to_response('document.html',{'title':'Inicio'})

class UserResource(ModelResource):
    class Meta:
        resource_name = 'user'
        allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = Authorization()
        
    def prepend_urls(self):
        #""" Add the following array of urls to the GameResource base urls """
        return [
            url(r"^(?P<resource_name>%s)/login%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('get_login'), name="api_get_login"),
        ]

    def get_login(self, request, **kwargs):
        print "Login"
        self.method_check(request, allowed=['post'])
        
        usuario = request.POST['user']
        clave = request.POST['password']
        user = authenticate(username=usuario,password=clave)
        
        session=None
        notif={}
        
        if user is not None:
            if user.is_active:
                login(request, user)
                status=1
                session={
                         'user':model_to_dict(user)
                }
                notif={
                     'type':'success',
                     'title':'Login correcto',
                     'txt':'Bienvenido '+user.username
                }
            else:
                status=0
                notif={
                     'type':'error',
                     'title':'Error',
                     'txt':'Tu usuario está <b>inactivo</b>, contacta con los administradores.'
                }
                
        else:
            status=0
            notif={
                     'type' : 'error',
                     'title' : 'Error',
                     'txt' : 'Usuario y/o contraseña no válidos.'
            }
            
        response_data = {
            'status':status,
            'session': session,
            'notif':notif,
            'success_url':request.POST['success_url']
        }
        
        return self.create_response(request, response_data)
            
class ClientesResource(ModelResource):
    class Meta:
        queryset = Clientes.objects.order_by("-creado")
        resource_name = 'clientes'
        allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = DjangoAuthorization()

class AppClientsResource(ModelResource):
    class Meta:
        queryset = ClientApps.objects.order_by("-creado")
        resource_name = 'apps'
        allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = DjangoAuthorization()
        

        
        

