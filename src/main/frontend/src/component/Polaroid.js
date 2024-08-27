import './Polaroid.css';

const Polaroid = ({ img, name, iswin, generation, isright }) => {
    const winicon = require('../resource/balancewinicon.png');

    return (<div className={"PolaroidFrame" + generation + (isright ? " rotateright" : " rotateleft" )}>
        <img className={'polariodimg'} src={img} alt="Polaroid Photo" />
        <div className='polariodname'>{name}</div>
        {iswin ? <div className="sticker">
            <img src={winicon} />
        </div> : <></>}
    </div>
    );
};

export default Polaroid;
