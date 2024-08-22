export interface IAllTasks {
  name: string;
  isCompleted: boolean;
  isFavorite: boolean;
}

export interface ITask extends IAllTasks {
  id: string;
}
