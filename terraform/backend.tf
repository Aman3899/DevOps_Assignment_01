terraform {
  backend "s3" {
    bucket         = "devops-assignment-mern-app"
    key            = "terraform.tfstate"
    region         = "eu-north-1"
    encrypt        = true
  }
}