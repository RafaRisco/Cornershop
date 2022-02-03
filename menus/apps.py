from django.apps import AppConfig
from django.db.models.signals import m2m_changed


class MenusConfig(AppConfig):
    name = 'menus'

    def ready(self):
        from .signals import m2m_change_menu
        from menus.models import Menu

        m2m_changed.connect(m2m_change_menu, sender=Menu.plates.through)

    # default_auto_field = 'django.db.models.BigAutoField'
