output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.main.name
}

output "aks_cluster_id" {
  value = azurerm_kubernetes_cluster.main.id
}

output "kubelet_identity" {
  value = azurerm_kubernetes_cluster.main.kubelet_identity[0].object_id
}
