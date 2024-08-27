import './Polaroid.css';

const Polaroid = ({ img, name, iswin, generation, isright }) => {
    const winicon = require('../resource/balancewinicon.png');

    return (<div class={"PolaroidFrame" + generation + (isright ? " rotateright" : " rotateleft" )}>
        <img className={'polariodimg'} src={img} alt="Polaroid Photo" />
        <div className='polariodname'>{name}</div>
        {iswin ? <div class="sticker">
            <img src={winicon} />
        </div> : <></>}
    </div>
    );
};

export default Polaroid;
