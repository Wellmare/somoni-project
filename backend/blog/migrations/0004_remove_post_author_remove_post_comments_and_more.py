# Generated by Django 4.1.4 on 2022-12-29 17:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_alter_post_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='author',
        ),
        migrations.RemoveField(
            model_name='post',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='post',
            name='pub_date',
        ),
        migrations.RemoveField(
            model_name='post',
            name='ratings',
        ),
    ]