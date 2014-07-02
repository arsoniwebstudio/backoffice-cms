# -*- coding: utf-8 -*-
from models.cms import *
from tastypie.resources import Resource, ModelResource
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

# class BaseCorsResource(Resource):
#     """
#     Class implementing CORS
#     """
#     def create_response(self, *args, **kwargs):
#         response = super(BaseCorsResource, self).create_response(*args, **kwargs)
#         response['Access-Control-Allow-Origin'] = '*'
#         response['Access-Control-Allow-Headers'] = 'Content-Type'
#         return response

#     def method_check(self, request, allowed=None):
#         if allowed is None:
#             allowed = []

#         request_method = request.method.lower()
#         allows = ','.join(map(str.upper, allowed))

#         if request_method == 'options':
#             response = HttpResponse(allows)
#             response['Access-Control-Allow-Origin'] = '*'
#             response['Access-Control-Allow-Headers'] = 'Content-Type'
#             response['Allow'] = allows
#             raise ImmediateHttpResponse(response=response)

#         if not request_method in allowed:
#             response = http.HttpMethodNotAllowed(allows)
#             response['Allow'] = allows
#             raise ImmediateHttpResponse(response=response)

#         return request_method

class UserResource(ModelResource):
    class Meta:
        resource_name = 'user'
        allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = Authorization()
        
    def prepend_urls(self):
        # """ Add the following array of urls to the GameResource base urls """
        return [
            url(r"^(?P<resource_name>%s)/login%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('get_login'), name="api_get_login"),
        ]

    def get_login(self, request, **kwargs):
        print "Login"
        
        # usuario = request.POST['user']
        # clave = request.POST['password']
        # user = authenticate(username=usuario,password=clave)
        
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
            
# class ClientesResource(ModelResource):
#     class Meta:
#         queryset = Clientes.objects.order_by("-creado")
#         resource_name = 'clientes'
#         allowed_methods = ['get', 'post', 'put', 'delete']
#         authorization = DjangoAuthorization()
        

        
        

