variable "acr_name" { type = string }
variable "environment" { type = string }
variable "location" { type = string }
variable "resource_group_name" { type = string }
variable "sku" {
  type    = string
  default = "Basic"
}
