# Generated by Django 4.1.4 on 2023-02-10 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0002_user_activate_key'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='activate_key',
            field=models.CharField(max_length=500, unique=True),
        ),
    ]
