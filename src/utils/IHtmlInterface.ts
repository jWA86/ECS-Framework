export { IHtmlInterface };

interface IHtmlInterface {
    id: string;
    display: boolean;
    url: string;
    toggleDisplay: () => void;
}
