# Generated by Django 4.2.19 on 2025-02-26 17:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("members", "0015_blacklistedtoken"),
    ]

    operations = [
        migrations.DeleteModel(name="BlacklistedToken",),
    ]
