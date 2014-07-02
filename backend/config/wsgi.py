import os
import sys
import site

# Add the site-packages of the chosen virtualenv to work with
site.addsitedir('/home/apps/backoffice-cms/env/lib/python2.7/site-packages')

# Add the app's directory to the PYTHONPATH
sys.path.append('/home/apps/backoffice-cms/backend')
sys.path.append('/home/apps/backoffice-cms/backend/config')
sys.path.append('/home/apps/backoffice-cms/backend/config/settings')

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings.production'

# Activate your virtual env
activate_env=os.path.expanduser("/home/apps/backoffice-cms/env/bin/activate_this.py")
execfile(activate_env, dict(__file__=activate_env))

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
