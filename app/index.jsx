import React from 'react';
import ReactDOM from 'react-dom'
import request from 'superagent'
import CodeMirror from 'react-codemirror';
import { Button,Card, Row, Col } from 'elemental'

import 'elemental/less/elemental.less'
require('codemirror/mode/stex/stex');
require('codemirror/mode/xml/xml');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			code:  "% Tex Equation",
            mml: '',
			svg: '',
			xmlHead:  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n",
			request: false,
		};

		this._updateCode = ::this._updateCode;
		this._tex2mml = ::this._tex2mml;
		this._clean = ::this._clean;
    }

	_updateCode(newCode) {
		this.setState({
			code: newCode,
		});
	}

	_tex2mml(tex) {
        const saveMML = (mml) => this.setState({mml: mml});
        const saveSvg = (svg) => this.setState({svg: svg});

        const toggleRequestStatus = () => this.setState({request: !this.state.request});

        toggleRequestStatus();
        request.post('/api/convert-tex2mml')
			.send({
				tex: tex
			})
			.type('application/json')
            .accept('application/json')
			.end(function(err, res) {
                toggleRequestStatus();
				try {
					if (res.body.result === 0) {
						saveMML(res.body.mml);
                        saveSvg(res.body.svg)
                    } else if (res.body.result === 1) {
                        saveMML(res.body.message)
					}
				} catch (e) {
					console.log(e.message);
                    saveMML('信息获取失败，请稍后再试！');
				}
			});

    }

    _clean() {
        this.setState({
            code: '',mml:'',svg: ''
        });
	}

	render() {
		const options = {
			lineNumbers: true,
            readOnly: false,
            mode: 'stex',
		};

        const mmlOptions = {
            lineNumbers: true,
            readOnly: true,
            mode: 'xml',
        };

        const style = {
        	wrapper: {
        		padding: 12
			},
			buttonWrapper: {
                padding: 12,
				float: 'left'
			}
		};

		return (<div style={style.wrapper}>
			<h3>LaTeX to MML（Word）公式转换器</h3>
			<Row>
				<Col sm="2/3">
					<h4>请输入公式</h4>
					<CodeMirror ref="editor" value={this.state.code} onChange={this._updateCode} options={options}/>
				</Col>
				<Col sm="1/3">
					<h4>预览</h4>
					<Card dangerouslySetInnerHTML={{__html:this.state.svg}}/>
				</Col>
			</Row>
			<Row>
				<Col>
					<div style={style.buttonWrapper}>
						<Button type="hollow-primary" onClick={() => this._tex2mml(this.state.code)}>转换</Button>
					</div>
					<div style={style.buttonWrapper}>
						<Button type="hollow-warning" onClick={() => this._clean()}>清空</Button>
					</div>
					<div style={style.buttonWrapper}>
                    {this.state.request? <span>转换中...</span>: null}
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<h4>结果（直接复制 MathML 格式到 word 即可，2007版之后支持。提示：Ctrl + A 全选，Ctrl + C 复制，Mac 系统为 Cmd）</h4>
				</Col>
			</Row>
			<CodeMirror ref="mml" value={this.state.xmlHead + this.state.mml} options={mmlOptions}/>

		</div>)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
