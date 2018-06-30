from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import PermissionAdmin
# Register your models here.
admin.site.register(Permission, PermissionAdmin)