# Generated by Django 4.1.4 on 2023-01-08 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0003_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='photo',
            field=models.ImageField(default='default.png', null=True, upload_to='profile_pics'),
        ),
    ]