# Generated by Django 4.1.4 on 2023-01-25 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_rename_image_post_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='pic',
            field=models.ImageField(null=True, upload_to='post_images'),
        ),
    ]