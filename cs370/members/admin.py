from django.contrib import admin
# import the database models that have been used
from .models import Member, User, Transaction 

class MemberAdmin(admin.ModelAdmin):
    pass

class UserAdmin(admin.ModelAdmin):
    pass

class TransactionAdmin(admin.ModelAdmin):
    pass

admin.site.register(Member, MemberAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Transaction, TransactionAdmin)
