variable "region" {
  default = "us-east-1"
}

variable "cluster_name" {
  default = "blog-app-cluster"
}

variable "kubernetes_version" {
  default = "1.29"
}

variable "desired_node_count" {
  default = 2
}

variable "max_node_count" {
  default = 3
}

variable "min_node_count" {
  default = 1
}

variable "tags" {
  type    = map(string)
  default = {
    Environment = "dev"
    Project     = "blog"
  }
}
