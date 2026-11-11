from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):

    queryset = Task.objects.all()

    serializer_class = TaskSerializer

    def get_queryset(self):

        queryset = Task.objects.all()

        status = self.request.query_params.get("status")

        if status == "completed":
            queryset = queryset.filter(completed=True)

        elif status == "pending":
            queryset = queryset.filter(completed=False)

        return queryset

    @action(detail=False, methods=["get"])
    def stats(self, request):

        total = Task.objects.count()

        completed = Task.objects.filter(
            completed=True
        ).count()

        pending = Task.objects.filter(
            completed=False
        ).count()

        data = {
            "total": total,
            "completed": completed,
            "pending": pending,
        }

        return Response(data)