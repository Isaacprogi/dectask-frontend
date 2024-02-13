export const formatDate = (inputDate: string): string => {
    const originalDate = new Date(inputDate);
    const formattedDate = originalDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  }