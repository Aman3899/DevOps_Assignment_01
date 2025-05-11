terraform {
  backend "s3" {
    # Replace these values with your actual S3 bucket and DynamoDB table
    # bucket         = "blog-app-terraform-state"
    # key            = "terraform.tfstate"
    # region         = "us-east-1"
    # dynamodb_table = "blog-app-terraform-locks"
    # encrypt        = true
  }
}