import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-proposal-field',
  templateUrl: './proposal-field.component.html',
  styleUrls: ['./proposal-field.component.scss'],
})
export class ProposalFieldComponent implements OnInit, OnDestroy {

  textInput = new FormControl();
  filteredProposals: string[] = [];
  showProposals = false;

  private acceptedProposal$ = new BehaviorSubject<string>('');
  private filter$ = new BehaviorSubject('');
  private readonly destroy$ = new Subject();

  @Input()
  public proposals: string[] = [];

  constructor() {
    this.textInput.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.filter$.next(value));

    this.acceptedProposal$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.textInput.setValue(value));
  }

  public ngOnInit(): void {
    this.filter$
      .pipe(
        takeUntil(this.destroy$),
        map(value => value.trim()),
        distinctUntilChanged(),
      ).subscribe(value => {
      console.log('filter ', value);
      this.filteredProposals = this.proposals.filter(proposal => proposal.toLowerCase().includes(value));
    });
  }

  public onProposalAccept$(proposal: string): void {
    this.acceptedProposal$.next(proposal);
    this.onBlur();
  }

  public onFocus(): void {
    this.showProposals = true;
    this.textInput.setValue('');
  }

  public onBlur(): void {
    this.showProposals = false;
    this.textInput.setValue(this.acceptedProposal$.getValue());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
