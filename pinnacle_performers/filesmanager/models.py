from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255, null=False)
    website = models.URLField(max_length=255, blank=True)


class Employee(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    email = models.EmailField(max_length=255, blank=True)


class Document(models.Model):
    path = models.CharField(max_length=255, null=False)
    filename = models.CharField(max_length=255, null=False)
    extension = models.CharField(max_length=10, blank=True)
    tags = models.CharField(max_length=255, blank=True)
    size = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class DocumentCreation(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class DocumentSignatureRequest(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    sender = models.ForeignKey(Employee, related_name='sent_requests', on_delete=models.CASCADE)
    recipient = models.ForeignKey(Employee, related_name='received_requests', on_delete=models.CASCADE)
    message = models.CharField(max_length=255, blank=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, default='pending')


class DocumentSignature(models.Model):
    request = models.ForeignKey(DocumentSignatureRequest, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    signature_data = models.BinaryField()
    signed_at = models.DateTimeField(auto_now_add=True)
