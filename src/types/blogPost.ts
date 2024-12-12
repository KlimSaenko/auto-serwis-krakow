export default interface IBlogPost {
    title: string;
    timeUpdated: number;
    content: string;
    url: string;
    previewText: string | undefined;
}