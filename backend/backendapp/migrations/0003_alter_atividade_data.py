# Generated by Django 3.2.5 on 2021-11-15 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0002_auto_20211115_1754'),
    ]

    operations = [
        migrations.AlterField(
            model_name='atividade',
            name='data',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]