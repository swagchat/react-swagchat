import * as React from 'react';
import { RadioButtonChecked, RadioButtonUnChecked, IOnClickProps } from '../';

export interface ICheckListItemProps extends IOnClickProps {
  text: string;
  icon?: React.ReactNode;
  isChecked?: boolean;
  checkedIcon?: React.ReactNode;
  unCheckedIcon?: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
  style?: Object;
}

export class CheckListItem extends React.Component<ICheckListItemProps, {}> {
  private _checkedDom: HTMLDivElement | null;
  private _unCheckedDom: HTMLDivElement | null;

  private _rootStyle: {
    width?: string;
    height?: string;
  };

  public static defaultProps: Partial<ICheckListItemProps> = {
    isChecked: false,
    className: '',
    style: {},
    onClick: () => {},
  };

  constructor(props: ICheckListItemProps) {
    super(props);

    this._rootStyle = {};
    this.props.width ? this._rootStyle.width = this.props.width : null;
    this.props.height ? this._rootStyle.height = this.props.height : null;
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
    const { text, icon, isChecked } = this.props;

    return (
      <div className="sc-check-list-item-wrap" onClick={this.onClick.bind(this)} style={this._rootStyle}>
        {(() => {
          if (icon) {
            return (
              <div className="sc-check-list-item-flex1">
                {icon}
              </div>
            );
          } else {
            return <div />;
          }
        })()}
        <div className="sc-check-list-item-flex2">
          <div className="sc-check-list-item-subject">{text}</div>
        </div>
        <div className="sc-check-list-item-flex3">
          {(() => {
            if (isChecked) {
              return (
                <div>
                  <div ref={(child) => this._checkedDom = child} style={{display: 'block'}}>
                    {this.props.checkedIcon ? this.props.checkedIcon : <RadioButtonChecked />}
                  </div>
                  <div ref={(child) => this._unCheckedDom = child} style={{display: 'none'}}>
                    {this.props.unCheckedIcon ? this.props.unCheckedIcon : <RadioButtonUnChecked style={{fill: 'rgba(153, 153, 153, 0.2)'}} />}
                  </div>
                </div>
              );
            } else {
              return (
                <div>
                  <div ref={(child) => this._checkedDom = child} style={{display: 'none'}}>
                    {this.props.checkedIcon ? this.props.checkedIcon : <RadioButtonChecked />}
                  </div>
                  <div ref={(child) => this._unCheckedDom = child} style={{display: 'block'}}>
                      {this.props.unCheckedIcon ? this.props.unCheckedIcon : <RadioButtonUnChecked style={{fill: 'rgba(153, 153, 153, 0.2)'}} />}
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
