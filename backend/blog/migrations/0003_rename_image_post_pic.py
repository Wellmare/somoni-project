# Generated by Django 4.1.4 on 2023-01-25 17:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_post_tags'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='image',
            new_name='pic',
        ),
    ]