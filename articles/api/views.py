from rest_framework import viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from articles.models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
  queryset = Article.objects.all().order_by('-id')
  serializer_class = ArticleSerializer


# class ArticleListView(ListAPIView):
#   queryset = Article.objects.all()
#   serializer_class = ArticleSerializer


# class ArticleDetailView(RetrieveAPIView):
#   queryset = Article.objects.all()
#   serializer_class = ArticleSerializer


# class ArticleUpdateView(UpdateAPIView):
#   queryset = Article.objects.all()
#   serializer_class = ArticleSerializer


# class ArticleDestroyView(DestroyAPIView):
#   queryset = Article.objects.all()
#   serializer_class = ArticleSerializer