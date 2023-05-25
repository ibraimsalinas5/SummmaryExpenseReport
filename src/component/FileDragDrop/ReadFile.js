export default function ReadFile(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve([fr.result, file.name]);
    };
    fr.onerror = reject;
    fr.readAsText(file);
  });
}
