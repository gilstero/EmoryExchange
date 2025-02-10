from django.contrib import admin
# import the database models that have been used
from .models import User, Transaction 

# class MemberAdmin(admin.ModelAdmin):
#     pass

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'profile_name', 'real_name', 'email', 'phone_num')
    search_fields = ('email', 'profile_name', 'real_name')
    list_filter = ('email', 'phone_num')
    fields = ('profile_name', 'real_name', 'email', 'phone_num', 'password')

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user_id_1', 'user_id_2', 'amount', 'date', 'user1_rating', 'user2_rating')
    search_fields = ('user_id_1__profile_name', 'user_id_2__profile_name', 'amount')
    list_filter = ('date', 'user1_rating', 'user2_rating')

# admin.site.register(Member, MemberAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Transaction, TransactionAdmin)
