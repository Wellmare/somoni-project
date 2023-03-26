from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from blog.models import Post, PostLike, Comments
from myapi.models import User
from .models import Notification


@receiver(post_save, sender=Post)
def create_notification_new_post(sender, instance, created, **kwargs):
    if created:
        for follower in instance.author.followers.all():
            notification = Notification()
            notification.html = f'<a href="https://somoni.org/user/{instance.author.id}">' \
                                f'{instance.author.username}</a> опубликовал новый пост <a' \
                                f' href="https://somoni.org/post/{instance.id}">"{instance.title}"</a>'
            notification.recipient = follower
            notification.save()


@receiver(post_save, sender=Comments)
def create_notification_new_comments(sender, instance, created, **kwargs):
    if created:
        notification = Notification()
        notification.html = f'<a href="https://somoni.org/user/{instance.author.id}">' \
                            f'{instance.author.username}</a> оставил(а) <a' \
                            f' href="https://somoni.org/post/{instance.post.id}#{instance.id}">комментарий</a>' \
                            f' на ваш пост <a' \
                            f' href="https://somoni.org/post/{instance.post.id}">"{instance.post.title}"</a>'
        notification.recipient = instance.post.author
        notification.save()


@receiver(post_save, sender=PostLike)
def create_notification_new_comments(sender, instance, created, **kwargs):
    if created:
        html = f'<a href="https://somoni.org/user/{instance.user.id}">' \
               f'{instance.user.username}</a> оценил ваш пост <a' \
               f' href="https://somoni.org/post/{instance.post.id}">"{instance.post.title}"</a>'
        try:
            get_object_or_404(Notification, recipient=instance.post.author, html=html)
        except:
            notification = Notification()
            notification.html = html
            notification.recipient = instance.post.author
            notification.save()



@receiver(m2m_changed, sender=User.following.through)
def func(sender, instance, action, using, pk_set, **kwargs):
    print(sender, instance, action, using, sep="\n")
    notification = Notification()
    if action == "post_add":
        for pk in pk_set:
            user = get_object_or_404(User, id=pk)

            notification.html = f'<a href="{domain}/user/{user.id}">' \
                                f'{user.username}</a> подписался(подписалась) на Вас'
            notification.recipient = instance
            notification.save()


    if action == "post_remove":
        for pk in pk_set:
            user = get_object_or_404(User, id=pk)

            notification.html = f'<a href="{domain}/user/{user.id}">' \
                                f'{user.username}</a> отписался(отписалась) от Вас'
            notification.recipient = instance
            notification.save()
