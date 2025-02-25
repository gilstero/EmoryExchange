from django.contrib import admin
# import the database models that have been used
from .models import User, Transaction, Listing, Message, Ride, Token


class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'profile_name', 'real_name', 'email', 'phone_num')
    search_fields = ('email', 'profile_name', 'real_name')
    list_filter = ('email', 'phone_num')
    fields = ('profile_name', 'real_name', 'email', 'phone_num', 'password', 'propic')

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user_id_1', 'user_id_2', 'amount', 'date', 'user1_rating', 'user2_rating')
    search_fields = ('user_id_1__profile_name', 'user_id_2__profile_name', 'amount')
    list_filter = ('date', 'user1_rating', 'user2_rating')

class ListingAdmin(admin.ModelAdmin):
    list_display = ('LID', 'user', 'amount', 'ldate', 'status', 'title')
    search_fields = ('title', 'user__profile_name')
    list_filter = ('status', 'tag', 'ldate')

class RideAdmin(admin.ModelAdmin):
    list_display = ('user_id_1', 'user_id_2', 'pickup_location', 'dropoff_location', 'date', 'status')
    search_fields = ('user_id_1__profile_name', 'user_id_2__profile_name', 'pickup_location', 'dropoff_location')
    list_filter = ('status', 'date')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('user_id_1', 'user_id_2', 'date', 'message')
    search_fields = ('user_id_1__profile_name', 'user_id_2__profile_name', 'message')
    list_filter = ('date',)

# admin.site.register(Member, MemberAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Listing, ListingAdmin)
admin.site.register(Ride, RideAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Token)