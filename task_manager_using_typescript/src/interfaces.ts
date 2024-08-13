export interface InterfaceAllTasks {
  name: string;
  isCompleted: boolean;
  isFavorite: boolean;
}

export interface InterfaceTask extends InterfaceAllTasks {
  id: string;
}
