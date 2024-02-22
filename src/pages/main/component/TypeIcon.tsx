import cssfileimage from '@/img/cssfileimage.png';
import htmlfileimage from '@/img/htmlfileimage.png';
import javafileimage from '@/img/javafileimage.png';
import jsfileimage from '@/img/jsfileimage.png';
import jsonfileimage from '@/img/jsonfileimage.png';
import mdfileimage from '@/img/mdfileimage.png';

type Props = {
    droppable: boolean | undefined;
    isOpen?: boolean;
    fileType: String | undefined;
};

function TypeIcon(props: Props) {
    if (props.droppable && !props.isOpen) {
        return (
            <span
                className="material-symbols-outlined FILL text-[20px]"
                style={{ color: '#F9D978' }}
            >
                folder
            </span>
        );
    } else if (props.droppable && props.isOpen) {
        return (
            <span
                className="material-symbols-outlined FILL text-[20px] "
                style={{ color: '#F9D978' }}
            >
                folder_open
            </span>
        );
    }

    switch (props.fileType) {
        case 'md':
            return (
                <div>
                    <img
                        className="w-5 h-5"
                        src={mdfileimage}
                        alt="mdfileimage"
                    />
                </div>
            );
        case 'json':
            return (
                <div>
                    <img
                        className="w-5 h-5 bg-no-repeat bg-contain"
                        src={jsonfileimage}
                        alt="jsonfileimage"
                    />
                </div>
            );
        case 'js':
            return (
                <div>
                    <img
                        className="w-5 h-5 bg-no-repeat bg-contain"
                        src={jsfileimage}
                        alt="jsfileimage"
                    />
                </div>
            );
        case 'java':
            return (
                <div>
                    <img
                        className="w-5 h-5 bg-no-repeat bg-contain"
                        src={javafileimage}
                        alt="javafileimage"
                    />
                </div>
            );
        case 'html':
            return (
                <div>
                    <img
                        className="w-5 h-5 bg-no-repeat bg-contain"
                        src={htmlfileimage}
                        alt="htmlfileimage"
                    />
                </div>
            );
        case 'css':
            return (
                <div>
                    <img
                        className="w-5 h-5 bg-no-repeat bg-contain"
                        src={cssfileimage}
                        alt="cssfileimage"
                    />
                </div>
            );
        case 'img':
            return (
                <div
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: '#a074c4' }}
                >
                    image
                </div>
            );
        case 'png':
            return (
                <div
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: '#a074c4' }}
                >
                    image
                </div>
            );
        case 'jpg':
            return (
                <div
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: '#a074c4' }}
                >
                    image
                </div>
            );
        case 'jpeg':
            return (
                <div
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: '#a074c4' }}
                >
                    image
                </div>
            );
        case 'gif':
            return (
                <div
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: '#a074c4' }}
                >
                    image
                </div>
            );
        case 'bmp':
            return (
                <div
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: '#a074c4' }}
                >
                    image
                </div>
            );
        default:
            return (
                <div className="material-symbols-outlined text-[20px]">
                    description
                </div>
            );
    }
}

export default TypeIcon;
