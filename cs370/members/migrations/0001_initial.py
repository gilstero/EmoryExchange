# Generated by Django 4.2.19 on 2025-03-07 16:40

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                (
                    "profile_name",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("real_name", models.CharField(blank=True, max_length=255, null=True)),
                ("phone_num", models.CharField(blank=True, max_length=20, null=True)),
                ("propic", models.URLField(blank=True, null=True)),
                ("last_login", models.DateTimeField(blank=True, null=True)),
                ("email", models.EmailField(max_length=255, unique=True)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Transaction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "user1_rating",
                    models.IntegerField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(5),
                        ],
                    ),
                ),
                ("user1_notes", models.TextField(blank=True, null=True)),
                (
                    "user2_rating",
                    models.IntegerField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(5),
                        ],
                    ),
                ),
                ("user2_notes", models.TextField(blank=True, null=True)),
                (
                    "id_1",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="transactions_as_sender",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "id_2",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="transactions_as_receiver",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Ride",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("pickup_location", models.CharField(max_length=255)),
                ("dropoff_location", models.CharField(max_length=255)),
                ("date", models.DateTimeField()),
                (
                    "amount",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=10, null=True
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("requested", "Requested"),
                            ("accepted", "Accepted"),
                            ("in_progress", "In Progress"),
                            ("completed", "Completed"),
                            ("cancelled", "Cancelled"),
                        ],
                        default="requested",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user_id_1",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="rides_as_driver",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "user_id_2",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="rides_as_passenger",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateTimeField(auto_now_add=True)),
                ("message", models.TextField()),
                (
                    "user_id_1",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="messages_sent",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "user_id_2",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="messages_received",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Listing",
            fields=[
                ("LID", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("ldate", models.DateTimeField(auto_now_add=True)),
                ("img", models.URLField(blank=True, null=True)),
                ("recurring", models.BooleanField(default=False)),
                (
                    "tag",
                    models.CharField(
                        choices=[
                            ("notag", "No Tag"),
                            ("clothing", "Clothing"),
                            ("misc", "Miscellaneous"),
                            ("electronics", "Electronics"),
                            ("schoolsupp", "School Supplies"),
                            ("free", "Free"),
                            ("transport", "Transport"),
                            ("service", "Service"),
                            ("tutoring", "Tutoring"),
                            ("careercoach", "Career Coaching"),
                            ("moving", "Moving Help"),
                            ("researchassist", "Research Assistance"),
                        ],
                        default="notag",
                        max_length=20,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("live", "Live"),
                            ("archived", "Archived"),
                            ("deleted", "Deleted"),
                        ],
                        default="live",
                        max_length=20,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                (
                    "id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
