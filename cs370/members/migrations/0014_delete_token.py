# Generated by Django 4.2.19 on 2025-02-26 17:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("members", "0013_alter_user_managers"),
    ]

    operations = [
        migrations.DeleteModel(name="Token",),
    ]
