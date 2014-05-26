from config import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin
from api.cms import *
admin.autodiscover()

clientes_resource = ClientesResource()
user_resource = UserResource()
app_resource = AppClientsResource()

urlpatterns = patterns('',
    # Examples: 
    # url(r'^$', 'backend.api.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    (r'^frontend/(?P<path>.*)$', 'django.views.static.serve', #Para servir archivos estaticos
        {'document_root': settings.STATIC_DOC_ROOT, 'show_indexes': True}), 
     (r'^$', 'backend.api.cms.home'),
     (r'^cms/api/', include(user_resource.urls)),
     (r'^cms/api/', include(clientes_resource.urls)),
     (r'^cms/api/', include(app_resource.urls)),
)
