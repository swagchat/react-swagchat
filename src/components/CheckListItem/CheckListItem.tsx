import * as React from 'react';
import { Avatar, RadioButtonChecked, RadioButtonUnChecked, IOnClickProps } from '../';

export interface ICheckListItemProps extends IOnClickProps {
  name: string;
  pictureUrl: string;
  isChecked?: boolean;
  width?: string;
  height?: string;
  className?: string;
  style?: Object;
}

export class CheckListItem extends React.Component<ICheckListItemProps, {}> {
  private _checkedDom: HTMLDivElement | null;
  private _unCheckedDom: HTMLDivElement | null;

  public static defaultProps: Partial<ICheckListItemProps> = {
    isChecked: false,
    className: '',
    style: {},
    onClick: () => {},
  };

  constructor(props: ICheckListItemProps) {
    super(props);
  }

  componentDidMount() {
    if (this._checkedDom && this._unCheckedDom) {
      this._checkedDom.addEventListener('click', this.onClick.bind(this));
      this._unCheckedDom.addEventListener('click', this.onClick.bind(this));
    }
  }

  onClick() {
    if (this._checkedDom && this._unCheckedDom) {
      let checkDomStyle = this._checkedDom.style;
      let unCheckedDom = this._unCheckedDom.style;
      checkDomStyle.display === 'block' ? checkDomStyle.display = 'none' : checkDomStyle.display = 'block';
      unCheckedDom.display === 'block' ? unCheckedDom.display = 'none' : unCheckedDom.display = 'block';
      this._checkedDom.setAttribute('style', checkDomStyle.cssText);
      this._unCheckedDom.setAttribute('style', unCheckedDom.cssText);
    }
    this.props.onClick ? this.props.onClick() : null;
  }

  render(): JSX.Element  {
    const { name, pictureUrl, isChecked, width, height } = this.props;

    return (
      <div className="sc-check-list-item-wrap" onClick={this.onClick.bind(this)}>
        <div className="sc-check-list-item-flex1">
          <Avatar src={pictureUrl} width={width} height={height} />
        </div>
        <div className="sc-check-list-item-flex2">
          <div className="sc-check-list-item-subject">{name}</div>
        </div>
        <div className="sc-check-list-item-flex3">
          {(() => {
            if (isChecked) {
              return (
                <div>
                  <div ref={(child) => this._checkedDom = child} style={{display: 'block'}}>
                    <RadioButtonChecked />
                  </div>
                  <div ref={(child) => this._unCheckedDom = child} style={{display: 'none'}}>
                    <RadioButtonUnChecked style={{fill: 'rgba(153, 153, 153, 0.2)'}} />
                  </div>
                </div>
              );
            } else {
              return (
                <div>
                  <div ref={(child) => this._checkedDom = child} style={{display: 'none'}}>
                    <RadioButtonChecked />
                  </div>
                  <div ref={(child) => this._unCheckedDom = child} style={{display: 'block'}}>
                    <RadioButtonUnChecked style={{fill: 'rgba(153, 153, 153, 0.2)'}} />
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}
