import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import IconButton from '@mui/material/IconButton';
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Popover, Select } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import { red } from '@mui/material/colors';

export default function Search() {
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
const ClickClose = (event) => {
    setAnchorEl(event.ClickClose);
};
const handleClose = () => {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

const [value, setValue] = React.useState('');
const handleChange = (event1) => {
    setValue(event1.target.value);
};
const [value2, setValue2] = React.useState('');
const handleChange2 = (event2) => {
    setValue2(event2.target.value);
};

const [value3, setValue3] = React.useState('');
const handleChange3 = (event3) => {
    setValue3(event3.target.value);
};

const [value4, setValue4] = React.useState('');
const handleChange4 = (event4) => {
    setValue4(event4.target.value);
};

  return (
    
        <div className='Search'>
            <div className="searchInputs">
                <div className="icon search">
                    <SearchIcon/>
                </div>
                <input className='input' type="text" placeholder='Tìm trong Drive'/>
                <div className='icon filter'>
                    <IconButton 
                        onClick={handleClick}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 1 }}
                    >
                        <DensityMediumIcon/>
                    </IconButton>
                    
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        className='pop'
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 50, left: 410 }}
                        
                    >
                        <div className="grid wide">
                            <div className="row">
                                <div className="col-3 content">
                                    <span className='text'>Loại</span>
                                </div>
                                <div className="col-3">
                                    <FormControl className='textf' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Bất kỳ</InputLabel>
                                        <Select
                                        className='select-kind'
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={value}
                                        onChange={handleChange}
                                        >
                                        <MenuItem value="">Bất kỳ</MenuItem>
                                        <MenuItem value={'img'}><ImageIcon sx={{ color: red[500], fontSize:20, marginRight:1 }}/> Ảnh và hình ảnh</MenuItem>
                                        <MenuItem value={'pdf'}><PictureAsPdfIcon sx={{ color: red[500], fontSize:20, marginRight:1 }}/> PDF</MenuItem>
                                        <MenuItem value={'document'}><ArticleIcon sx={{ color: red[500], fontSize:20, marginRight:1 }}/> Tài liệu</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-3 close">
                                <IconButton 
                                    onClick={ClickClose}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label=""
                                    sx={{ mr: 1 }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 content">
                                        <span>Chủ sở hữu</span>
                                </div>
                                <div className="col-3">
                                <FormControl className='textf' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Bất kỳ ai</InputLabel>
                                        <Select
                                        className='select-kind'
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={value2}
                                        onChange={handleChange2}
                                        >
                                        <MenuItem value="">
                                            <em>Bất kỳ ai</em>
                                        </MenuItem>
                                        <MenuItem value={4}>Do tôi sở hữu</MenuItem>
                                        <MenuItem value={5}>Không do tôi sở hữu</MenuItem>
                                        <MenuItem value={6}>Một người cụ thể...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-3 content">
                                        <span>Có các từ</span>
                                </div>
                                <div className="col-3">
                                    <input className='input fword' type="text" placeholder='Nhập các từ tìm thấy trong tệp' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-3 content">
                                    <span>Tên mục</span>
                                </div>
                                <div className="col-3">
                                    <input className='input fword' type="text" placeholder='Nhập cụm từ khớp' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-3 address">
                                        <span>Địa điểm</span>
                                </div>
                                <div className="col-3">
                                    <button className='btn-address'>MỌI NƠI</button>
                                    <div className='ckbox-wrapper'>
                                        <FormGroup className='ckbox' aria-label="position" row>
                                        <FormControlLabel  control={<Checkbox />} label="Trong thùng rác" />
                                        <FormControlLabel  control={<Checkbox />} label="Có gắn dấu sao" />
                                        <FormControlLabel  control={<Checkbox />} label="Đã mã hóa" />
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 content">
                                        <span>Ngày sửa đổi</span>
                                </div>
                                <div className="col-3">
                                    <FormControl className='textf' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Mọi lúc</InputLabel>
                                        <Select
                                        className='select-kind'
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={value3}
                                        onChange={handleChange3}
                                        >
                                        <MenuItem value="">
                                            <em>Mọi lúc</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Hôm nay</MenuItem>
                                        <MenuItem value={20}>Hôm qua</MenuItem>
                                        <MenuItem value={30}>7 ngày qua</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-3 content">
                                        <span>Yêu cầu phê duyệt</span>
                                </div>
                                <div className="col-3">
                                    <div className='ckbox-wrapper'>
                                        <FormGroup className='ckbox' aria-label="position" row>
                                        <FormControlLabel  control={<Checkbox />} label="Đang chờ tôi phê duyệt" />
                                        <FormControlLabel  control={<Checkbox />} label="Do tôi yêu cầu" />
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-3 content">
                                        <span>Đã chia sẻ với</span>
                                </div>
                                <div className="col-3">
                                    <input className='input fword' type="text" placeholder='Nhập tên hoặc địa chỉ email...' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 content">
                                        <span>Theo dõi</span>
                                </div>
                                <div className="col-3">
                                    <FormControl className='textf' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">-</InputLabel>
                                        <Select
                                        className='select-kind'
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={value4}
                                        onChange={handleChange4}
                                        >
                                        <MenuItem value="">
                                            <em>-</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Bất kỳ</MenuItem>
                                        <MenuItem value={20}>Chỉ đề xuất</MenuItem>
                                        <MenuItem value={30}>Chỉ mục tác vụ</MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                </div>
                            </div>
                            <div className='row option-wrapper'>
                                <div className="more-info">
                                    <button className='btn-info'>TÌM HIỂU THÊM</button>
                                </div>
                                <div className="search-wrapper">
                                    <button className='btn-reset'>ĐẶT LẠI</button>
                                    <button className='btn-search'>TÌM KIẾM</button>
                                </div>
                            </div>
                        </div>
                        
                        
                    </Popover>
                </div>
            </div>
        </div>
    
  );
}



    


