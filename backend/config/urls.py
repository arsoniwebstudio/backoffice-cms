from settings import settings

from django.conf.urls import patterns, include, url
from django.contrib import admin
from api.cms import *
admin.autodiscover()

clientes_resource = ClientesResource()
user_resource = UserResource()

urlpatterns = patterns('',

    #url(r'^admin/', include(admin.site.urls)),
    (r'^frontend/(?P<path>.*)$', 'django.views.static.serve', #Para servir archivos estaticos
        {'document_root': settings.STATIC_DOC_ROOT, 'show_indexes': True}),
     (r'^api/cms/', include(user_resource.urls)),
     (r'^api/cms/', include(clientes_resource.urls)),
)
