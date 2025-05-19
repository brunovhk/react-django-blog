from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from posts.models import Post
from comments.models import Comment
from posts.models import Tag
from faker import Faker
import random


class Command(BaseCommand):
    help = "Seed the database with demo users, posts, comments, and tags"

    def handle(self, *args, **kwargs):
        fake = Faker()

        self.stdout.write("\n🔁 Cleaning up previous demo data...")
        Comment.objects.all().delete()
        Post.objects.all().delete()
        Tag.objects.all().delete()
        User.objects.filter(username__startswith="demo_").delete()

        self.stdout.write("✅ Seeding users...")
        users = []
        for i in range(3):
            user = User.objects.create_user(
                username=f"demo_user{i+1}", email=fake.email(), password="12345678"
            )
            users.append(user)

        self.stdout.write("✅ Seeding tags...")
        tag_names = [fake.word() for _ in range(10)]
        tags = [Tag.objects.create(name=name) for name in tag_names]

        self.stdout.write("✅ Seeding posts and comments...")
        for user in users:
            for _ in range(8):
                post = Post.objects.create(
                    author=user,
                    title=fake.sentence(nb_words=6),
                    content=fake.paragraph(nb_sentences=10),
                )
                # Randomly assign tags between 1 and 3 to the post
                post.tags.set(random.sample(tags, k=random.randint(1, 3)))

                for _ in range(random.randint(1, 3)):
                    comment = Comment.objects.create(
                        post=post,
                        author=random.choice(users),
                        content=fake.sentence(),
                        is_approved=True,
                    )
                    if random.choice([True, False]):
                        Comment.objects.create(
                            post=post,
                            author=random.choice(users),
                            content=fake.sentence(),
                            parent=comment,
                            is_approved=True,
                        )

        self.stdout.write(self.style.SUCCESS("\n🌱 Demo data seeded successfully."))
