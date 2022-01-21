import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDialogComponent } from './nav-dialog.component';

describe('NavDialogComponent', () => {
	let component: NavDialogComponent;
	let fixture: ComponentFixture<NavDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NavDialogComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NavDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
