# Generated by Django 4.2.19 on 2025-02-18 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("members", "0004_token"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="user_id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
