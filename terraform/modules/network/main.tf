resource "azurerm_virtual_network" "main" {
  name                = "${var.vnet_name}-${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  address_space       = [var.vnet_address_space]

  tags = {
    environment = var.environment
    project     = "hydrus-devops-platform"
  }
}

resource "azurerm_subnet" "aks" {
  name                 = "aks-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = [var.subnet_address_prefix]
}
