from rest_framework.routers import DefaultRouter
from articles.api.views import ArticleViewSet
from django.urls import path
# from .views import ArticleListView, ArticleDetailView, ArticleUpdateView, ArticleDestroyView

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='articles')
urlpatterns = router.urls

# urlpatterns = [
#   path('', ArticleListView.as_view()),
#   path('<str:pk>/', ArticleDetailView.as_view()),
#   path('<str:pk>/update/', ArticleUpdateView.as_view()),
#   path('<str:pk>/delete/', ArticleDestroyView.as_view()),
# ]