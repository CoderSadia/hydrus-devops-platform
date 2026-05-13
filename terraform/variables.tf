variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "hydrus-rg"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
}

variable "environment" {
  description = "Environment name (dev, stage, prod)"
  type        = string
  default     = "dev"
}

variable "cluster_name" {
  description = "AKS cluster name"
  type        = string
  default     = "hydrus-aks"
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
  default     = "hydrusacr"
}

variable "node_count" {
  description = "Number of AKS nodes"
  type        = number
  default     = 2
}

variable "node_vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_B2s"
}

variable "vnet_name" {
  description = "Virtual Network name"
  type        = string
  default     = "hydrus-vnet"
}

variable "vnet_address_space" {
  description = "Address space for VNet"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_address_prefix" {
  description = "Address prefix for AKS subnet"
  type        = string
  default     = "10.0.1.0/24"
}
