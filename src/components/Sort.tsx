function InsertionSort(arr: number[]): number[] {
  let i, key, j;
  let n = arr.length
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    /* Move elements of arr[0..i-1], that are  
    greater than key, to one position ahead  
    of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr
}

export function Sort(arr: number[], type: string): number[] {
  return InsertionSort(arr)
}
