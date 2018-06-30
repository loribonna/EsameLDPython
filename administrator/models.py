from authentication.models import UserBase
from django.contrib.auth.models import Permission
from django.contrib import admin

class AdminUser(UserBase):
    class Meta:
        permissions=(('admin','ADMIN'),)

class PermissionAdmin(admin.ModelAdmin):
    model = Permission
    fields = ['name']